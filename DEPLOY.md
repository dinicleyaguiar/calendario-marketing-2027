# Publicação: GitHub + Vercel

## 1. Criar o repositório no GitHub

Na conta `dinicleyaguiar`, crie um repositório vazio chamado:

```text
calendario-marketing-2027
```

Não marque as opções para criar README, `.gitignore` ou licença, pois esses arquivos já estão no projeto.

## 2. Enviar usando HTTPS

O projeto já está inicializado e com o primeiro commit. Dentro da pasta, execute:

```bash
git remote add origin https://github.com/dinicleyaguiar/calendario-marketing-2027.git
git push -u origin main
```

O HTTPS é recomendado neste caso para evitar o erro:

```text
git@github.com: Permission denied (publickey)
```

Quando o GitHub solicitar autenticação, faça login pelo navegador ou use um Personal Access Token no lugar da senha.

## 3. Importar na Vercel

1. Entre em `vercel.com` usando a conta do GitHub.
2. Clique em **Add New** e depois **Project**.
3. Localize `calendario-marketing-2027` e clique em **Import**.
4. Confirme o framework **Next.js**.
5. Deixe os comandos automáticos detectados pela Vercel.
6. Não adicione variáveis de ambiente.
7. Clique em **Deploy**.

## 4. Atualizações futuras

Depois de alterar o projeto:

```bash
git add .
git commit -m "feat: descreva a alteração"
git push
```

Cada `push` na branch `main` gera automaticamente uma nova publicação na Vercel.
