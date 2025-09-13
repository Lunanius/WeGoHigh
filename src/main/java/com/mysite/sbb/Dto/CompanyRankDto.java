package com.mysite.sbb.Dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CompanyRankDto {
    private String company;
    private Long companyCount;
    public CompanyRankDto(String company, Long companyCount) {
        this.company = company;
        this.companyCount = companyCount;
    }
}
