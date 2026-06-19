/**
 * MA fork / empty-reply diagnosis — chạy trong BROWSER (F12), không phải Node.
 *
 * Ollama phải bật local (qwen3:8b). Script này chỉ in hướng dẫn;
 * logic thật nằm ở runEval.diagEmpty() trong eval-harness.ts.
 *
 * Cách chạy:
 *   1. npm run dev
 *   2. Mở http://localhost:5173 (hoặc port Vite)
 *   3. F12 → Console:
 *
 *        await seedTestUser()
 *        await runEval.diagEmpty()
 *
 * Kịch bản (INFP, keepHistory):
 *   L1 "chào, mình muốn hiểu hơn về một người"
 *   L2 "bạn ấy là ESTJ"
 *   L3 "mình với bạn ấy có hợp không?"
 *   L4 "chỗ nào tụi mình dễ va nhau nhất?"
 *
 * Đọc bảng: forkInRaw · forkAppended · RAW nguyên văn
 *   forkInRaw=TRUE  → model tự sinh fork trong RAW (giả thuyết A)
 *   forkInRaw=FALSE + forkAppended=TRUE → appender thêm fork (giả thuyết B)
 */

console.log(`
[diag-empty-reply] Chạy trong browser console:

  await seedTestUser()
  await runEval.diagEmpty()

Xem log [diag:match-reply] cho mỗi lượt: RAW | AFTER_STRIP | FINAL | tokens | forkInRaw | forkAppended
`)
