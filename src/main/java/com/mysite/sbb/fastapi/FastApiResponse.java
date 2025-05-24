package com.mysite.sbb.fastapi;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
public class FastApiResponse {
    private String message;
    private String title;
    private String time;
    private String content;
    private String thumbnail_url;
    private String url;
    private String summary;
    private String company;
    private List<Map<String, Object>> keyword;
}
