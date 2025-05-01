pip install transformers
pip install git+https://github.com/SKT-AI/KoBART  #egg=kobart --no-deps
pip install bs4 requests
pip install torch

python.exe -m pip install --upgrade pip
pip install matplotlib
pip install seaborn

#밑에꺼 설치하고 tensorflow 깔아야댐

https://aka.ms/vs/17/release/vc_redist.x64.exe
pip install tensorflow
pip install scikit-learn
pip install git+https://github.com/financedata/FinanceDataReader.git


#이거 다 깔아야함 가상환경 만들어서 하셈 메모장에 어캐 하는지 넣어둠

#python --version 해서 3.10넘는지 확인 10밑은 torch 안깔린데
#kobart 까는거는 밑에껄로 하면 오류 안걸리긴함 그냥 kobart랑 torch 버전이 안맞아서 그러는건데 torch버전 높아도 kobart 돌아감 
#와 십 interpreter 달라서 계속 안됐네 슈발 ctrl shift p 누르고 인터프리터들가서 터미널이랑 실행 같은버전인지 확인하셈 

pip install --no-deps git+https://github.com/SKT-AI/KoBART#egg=kobart

#emotion.py 는 감성분석 lstm = 데이터 학습, lstm_test = sk하이닉스로 테스트, 만약에 학습 모르고 더시켜서 오버피팅 난거 같으면 trained_lstm_model.h5 파일이랑 tmp 폴더 삭제하면 됨 

/*버전 정보 
transformers                 4.51.3
bs4                          0.0.2
torch                        2.7.0
tensorflow                   2.19.0
scikit-learn                 1.6.1
Python 3.10.10