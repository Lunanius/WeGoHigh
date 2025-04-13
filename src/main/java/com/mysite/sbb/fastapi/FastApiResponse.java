package com.mysite.sbb.fastapi;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FastApiResponse {
    private String message;
    private String title;
    private String time;
    private String content;
    private String thumbnail_url;
    private String url;
}
