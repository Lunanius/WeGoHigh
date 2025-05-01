# 이거 작동 잘 되나 시험하는거임 깔거 다깔면 실행됨됨

import transformers
from transformers import PreTrainedTokenizerFast, BartForConditionalGeneration


tokenizer = PreTrainedTokenizerFast.from_pretrained('gogamza/kobart-base-v2')
model = BartForConditionalGeneration.from_pretrained('gogamza/kobart-base-v2')

input_text = "오늘 날씨는 맑고 기분이 좋다. 내일은 친구와 여행을 간다."
inputs = tokenizer([input_text], return_tensors='pt')
summary_ids = model.generate(inputs['input_ids'], max_length=50)
print(tokenizer.decode(summary_ids[0], skip_special_tokens=True))
