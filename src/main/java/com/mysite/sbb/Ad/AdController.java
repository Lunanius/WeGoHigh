package com.mysite.sbb.Ad;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/")
public class AdController {
    private final AdService adService;

    @GetMapping("ads")
    public List<AdDTO> getAds() {
        return adService.getDummyAd();
    }
}
