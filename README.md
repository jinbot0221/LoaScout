# LoaScout


로스트아크 화면 공유 기반 AI 전투력 분석기 콘셉트 웹페이지입니다. 브라우저 화면 공유 기능으로 전투 화면 또는 전투력 분석기를 연결하고, 데모 분석과 장문 리포트 미리보기를 확인할 수 있습니다.

## Market Pulse

기존 LoaScout 화면과 별도로 `/market-pulse/` 경로에서 국내 주식시장의 주도 섹터, 거래대금, 대표 종목 및 섹터 모멘텀을 확인할 수 있는 반응형 대시보드를 제공합니다.

```bash
npm run dev
# http://localhost:5173/market-pulse/
```

Market Pulse에 표시되는 수치는 UI 데모 데이터입니다. 실제 서비스에서는 증권사 또는 거래소 데이터 API 연결이 필요합니다.
