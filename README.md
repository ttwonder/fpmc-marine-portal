# 台塑海技管理平台入口首頁

這是一個免費靜態入口網站，用於集中呈現台塑海技相關管理平台。首頁採用「網站快照卡片 + 進入系統按鈕」形式，方便同仁快速跳轉到各管理平台。

## 已整合平台

- 船隊檢查管理平台：<https://sski2468-hua.github.io/fleet-inspection/>
- 法規更新、外來信息鑒別管理平台：<https://ttwonder.github.io/maritime-regulations-github/>
- PSC 業內資訊管理平台：<https://ttwonder.github.io/psc-atlas/>
- SQMS 程序書修訂需求管理平台：<https://ttwonder.github.io/sqms-revision-system-ready/>
- 月度安全會議報告平台：<https://ttwonder.github.io/monthly-safety-report-system/>

> 注意：若平台本身需要密碼或權限，仍由該平台自行控管。入口首頁不公開顯示密碼。

## 如何新增平台

可以先打開 `maintenance.html` 使用「系統維護」介面新增、修改或刪除平台資料，完成後下載新的 `platforms.json` 並覆蓋 `data/platforms.json`。

也可以直接編輯 `data/platforms.json`，新增一筆資料：

```json
{
  "id": "new-system",
  "title": "新平台名稱",
  "subtitle": "English Name",
  "description": "平台用途說明。",
  "url": "https://example.com/",
  "image": "assets/screenshots/new-system.png",
  "badge": "已上線",
  "status": "online",
  "meta": "分類 · 關鍵字"
}
```

## 如何更換快照

1. 將新的截圖放入 `assets/screenshots/`。
2. 在 `data/platforms.json` 將該平台的 `image` 欄位改成新圖片路徑。
3. Commit 並推送到 GitHub 後，GitHub Pages 會自動更新。

## 本機預覽

在專案資料夾執行：

```bash
python3 -m http.server 8080
```

然後開啟：

```text
http://localhost:8080/
```

## 部署到 GitHub Pages

1. 將此資料夾發布為 GitHub repository，例如 `fpmc-marine-portal`。
2. 到 GitHub Repository → Settings → Pages。
3. Source 選擇 `GitHub Actions`。
4. 推送到 `main` 分支後，Actions 會自動部署。

建議公開網址：

```text
https://ttwonder.github.io/fpmc-marine-portal/
```
