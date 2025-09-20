package com.mysite.sbb.Ad;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdService {

    public List<AdDTO> getDummyAd() {
        return Arrays.asList(
                new AdDTO("ad1", "https://via.placeholder.com/728x90.png?text=Dummy+Ad+1", "멋진 신상품!", "https://example.com/item1"),
                new AdDTO("ad2", "https://via.placeholder.com/728x90.png?text=Dummy+Ad+2", "기간 한정 할인!", "https://example.com/item2")
        );
    }
}
