1. ke cloudflare
2. daftar
3. ke workers and page
4. create application --> helo word
5. deploy
6. kasi nama

7. masuk setting --> variable and secret --> text ke secret --> variable name : API-KEY -->  kasi token/value sak sakmu
8. masuk bindings --> add binds --> worker ai --> var name sak sakmu --> deploy
9. edit code kanan atas
10. copas
11. deploy

12. jajal
curl -X POST https://<your-worker>.workers.dev -H "Authorization: Bearer-your-secret-api-key" -H "Content-Type:
application/json" -d "{\"prompt\": \"A cute robot cooking breakfast\"}" --output image.jpg
