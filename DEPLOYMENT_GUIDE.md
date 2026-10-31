# Madhuri's portfolio: download and deploy

## Run it on your computer

1. Install Node.js (the current LTS version) from https://nodejs.org/.
2. Extract the ZIP file to a folder you can find again.
3. Open that folder in VS Code, then choose **Terminal → New Terminal**.
4. Run:

   ```powershell
   npm install
   npm run dev
   ```

5. Open the local address Vite prints, usually http://localhost:5173/.
6. Press `Ctrl+C` in the terminal to stop the local server.

## Publish it on Vercel using GitHub

### Upload the project to GitHub

1. Create a new **empty** repository at https://github.com/new. Do not initialize it with a README or other files.
2. In VS Code, open the extracted project folder and choose **Terminal → New Terminal**.
3. Replace `YOUR_USERNAME` and `YOUR_REPOSITORY` below with your GitHub details, then run each command:

   ```powershell
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
   git push -u origin main
   ```

   If Git asks you to identify yourself, set a name and email with `git config --global user.name "Your Name"` and `git config --global user.email "you@example.com"`, then repeat the commit and push steps. GitHub may open a browser sign-in.

### Deploy from Vercel

1. Sign in at https://vercel.com/ and choose **Add New → Project**.
2. Connect GitHub if prompted, then import the repository you just created.
3. Vercel should detect Vite. Check these values:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Output directory: `dist`
4. Click **Deploy**. When it finishes, Vercel shows the public site URL.

After this setup, pushing new commits to `main` automatically creates an updated deployment. The portfolio is a frontend site; it does not currently have a backend service to deploy.

## Optional: deploy with the Vercel CLI

From the project folder, run:

```powershell
npm install
npm install -g vercel
vercel login
vercel
```

Follow the prompts to link or create the Vercel project. For a production deployment, run `vercel --prod`.

## Project notes

- Source code is in `src/`; the resume is in `public/`.
- `npm run build` creates the production site in `dist/`.
- The resume PDF is included in this ZIP, so it will be publicly accessible on the deployed portfolio.
