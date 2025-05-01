import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow.keras.models import load_model
import FinanceDataReader as fdr

# 모델 불러오기
model = load_model("trained_lstm_model.h5")

# 스톡 코드: 000660 (SK하이닉스)
STOCK_CODE = '000660'

# 주식 데이터 로드
stock = fdr.DataReader(STOCK_CODE)

# 날짜로 필터링 (2020-01-01 ~ 2024-12-31)
stock = stock.loc['2020-01-01':'2024-12-31']

# 스케일링
scaler = MinMaxScaler()
scale_cols = ['Open', 'High', 'Low', 'Close', 'Volume']
scaled = scaler.fit_transform(stock[scale_cols])
df = pd.DataFrame(scaled, columns=scale_cols)

# 입력, 출력 데이터 준비
x = df.drop('Close', axis=1)
y = df['Close']

# 윈도우 처리 함수
def windowed_dataset(series, window_size, batch_size, shuffle):
    series = tf.expand_dims(series, axis=-1)
    ds = tf.data.Dataset.from_tensor_slices(series)
    ds = ds.window(window_size + 1, shift=1, drop_remainder=True)
    ds = ds.flat_map(lambda w: w.batch(window_size + 1))
    if shuffle:
        ds = ds.shuffle(1000)
    ds = ds.map(lambda w: (w[:-1], w[-1]))
    return ds.batch(batch_size).prefetch(1)

# 윈도우 파라미터
WINDOW_SIZE = 20
BATCH_SIZE = 32

# 데이터셋 준비
data = windowed_dataset(y, WINDOW_SIZE, BATCH_SIZE, False)

# 예측 수행
pred = model.predict(data)

# 실제값 시각화
plt.figure(figsize=(12, 8))
plt.plot(np.asarray(y)[WINDOW_SIZE:], label='Actual')
plt.plot(pred, label='Prediction')
plt.title('Stock Price Prediction - SK하이닉스 (2020~2024)')
plt.legend()
plt.grid(True)
plt.show()
