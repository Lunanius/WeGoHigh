package com.mysite.sbb.Ad;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class AdDTO {
    private String adId;
    private String imageUrl;
    private String title;
    private String link;

    public AdDTO(String ad1, String imageUrl, String title, String url) {
        this.adId = ad1;
        this.imageUrl = imageUrl;
        this.title = title;
        this.link = url;
    }
}
