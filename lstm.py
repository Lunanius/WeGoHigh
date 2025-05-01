import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import warnings
import os

import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, LSTM, Conv1D
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint
from tensorflow.keras.losses import Huber
from tensorflow.keras.optimizers import Adam
import FinanceDataReader as fdr

# 불필요한 경고 숨김
warnings.filterwarnings('ignore')

# 한글 폰트 깨짐 방지(이거 고쳐야댐댐)
plt.rcParams['font.family'] = 'NanumGothic'

# 금융정보를 가져올 수 있게 해주는 라이브러리
# 삼성전자 주식코드: 005930
STOCK_CODE = '005930'

# 주식 데이터 로드
stock = fdr.DataReader(STOCK_CODE)

# 데이터 처리
stock['Year'] = stock.index.year
stock['Month'] = stock.index.month
stock['Day'] = stock.index.day

# 데이터 값 정규화 (0~1사이로)
scaler = MinMaxScaler()
scale_cols = ['Open', 'High', 'Low', 'Close', 'Volume']
scaled = scaler.fit_transform(stock[scale_cols])
df = pd.DataFrame(scaled, columns=scale_cols)

# train, test 데이터 분할
x_train, x_test, y_train, y_test = train_test_split(
    df.drop('Close', axis=1),  # 'Close' 열 제거
    df['Close'],               # 예측 대상 목표 변수
    test_size=0.2,
    random_state=0,
    shuffle=False
)

# Windowed dataset 함수
def windowed_dataset(series, window_size, batch_size, shuffle):
    series = tf.expand_dims(series, axis=-1)
    ds = tf.data.Dataset.from_tensor_slices(series)
    ds = ds.window(window_size + 1, shift=1, drop_remainder=True)
    ds = ds.flat_map(lambda w: w.batch(window_size + 1))
    if shuffle:
        ds = ds.shuffle(1000)
    ds = ds.map(lambda w: (w[:-1], w[-1]))
    return ds.batch(batch_size).prefetch(1)

# 하이퍼파라미터 정의
WINDOW_SIZE = 20
BATCH_SIZE = 32

# 데이터셋 준비
train_data = windowed_dataset(y_train, WINDOW_SIZE, BATCH_SIZE, True)
test_data = windowed_dataset(y_test, WINDOW_SIZE, BATCH_SIZE, False)

# LSTM 모델 구성
model = Sequential([
    Conv1D(filters=32, kernel_size=5,
           padding="causal",
           activation="relu",
           input_shape=[WINDOW_SIZE, 1]),
    LSTM(16, activation='tanh'),
    Dense(16, activation="relu"),
    Dense(1),
])

# 모델 컴파일
model.compile(loss=Huber(), optimizer=Adam(0.0005), metrics=['mse'])

# 모델 체크포인트 및 얼리스토핑 설정
earlystopping = EarlyStopping(monitor='val_loss', patience=10)
filename = os.path.join('tmp', 'checkpoint.weights.h5')
checkpoint = ModelCheckpoint(filename,
                             save_weights_only=True,
                             save_best_only=True,
                             monitor='val_loss',
                             verbose=1)

# 모델 학습
history = model.fit(train_data,
                    validation_data=(test_data),
                    epochs=50,
                    callbacks=[checkpoint, earlystopping])

# 학습된 모델 가중치 로드
model.load_weights(filename)

# 예측 수행
pred = model.predict(test_data)

# 주식 예측 시각화
plt.figure(figsize=(12, 9))
plt.plot(np.asarray(y_test)[20:], label='Actual')
plt.plot(pred, label='Prediction')
plt.legend()
plt.show()

# BERT 모델 로드 및 예시
import torch
from transformers import BertTokenizer, BertForSequenceClassification
import torch.nn.functional as F

# BERT 모델 준비
model_name = "kykim/bert-kor-base"
model_bert = BertForSequenceClassification.from_pretrained(model_name, num_labels=2)
tokenizer = BertTokenizer.from_pretrained(model_name)

# BERT 예시 코드
text = "예시 텍스트"
inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True, max_length=512)
outputs = model_bert(**inputs)
logits = outputs.logits
predictions = torch.argmax(logits, dim=-1)

print(f"Predicted class: {predictions.item()}")

# 학습된 모델 가중치 로드
model.load_weights(filename)

# 모델 저장 (전체 구조 + 가중치 포함)
model.save("trained_lstm_model.h5")