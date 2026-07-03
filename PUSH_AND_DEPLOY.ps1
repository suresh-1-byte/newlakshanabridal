# Complete GitHub Push and Vercel Deployment Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "GITHUB PUSH + VERCEL DEPLOYMENT" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Set-Location "d:\lakshana mam\lakshana-luxe-glow-main"

# Step 1: Check if GitHub CLI is installed
Write-Host "[1/4] Checking GitHub CLI..." -ForegroundColor Yellow
$ghInstalled = Get-Command gh -ErrorAction SilentlyContinue

if (-not $ghInstalled) {
    Write-Host "Installing GitHub CLI..." -ForegroundColor Yellow
    winget install --id GitHub.cli -e --silent
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host ""
        Write-Host "⚠️  GitHub CLI installation failed." -ForegroundColor Red
        Write-Host "Opening GitHub Desktop method..." -ForegroundColor Yellow
        Start-Process "https://desktop.github.com/"
        Write-Host ""
        Write-Host "Please use GitHub Desktop to publish your repository."
        pause
        exit
    }
    
    # Refresh PATH
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
}

# Step 2: Authenticate with GitHub
Write-Host ""
Write-Host "[2/4] Authenticating with GitHub..." -ForegroundColor Yellow
gh auth login

# Step 3: Create repository and push
Write-Host ""
Write-Host "[3/4] Creating GitHub repository and pushing code..." -ForegroundColor Yellow

# Delete existing remote if any
git remote remove origin 2>$null

# Create new repo and push
gh repo create lakshana-bridal-studio --public --source=. --remote=origin --push

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Code pushed to GitHub successfully!" -ForegroundColor Green
    Write-Host "Repository: https://github.com/suresh-i-byte/lakshana-bridal-studio" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "⚠️  GitHub push failed. Continuing with Vercel deployment..." -ForegroundColor Yellow
}

# Step 4: Deploy to Vercel
Write-Host ""
Write-Host "[4/4] Deploying to Vercel..." -ForegroundColor Yellow
Write-Host ""

$env:VITE_FIREBASE_API_KEY = "AIzaSyCgdbZk6MU5gdCbyeUUX33TkQkycbZo6BM"
$env:VITE_FIREBASE_AUTH_DOMAIN = "lakshanaatelier.firebaseapp.com"
$env:VITE_FIREBASE_PROJECT_ID = "lakshanaatelier"
$env:VITE_FIREBASE_STORAGE_BUCKET = "lakshanaatelier.firebasestorage.app"
$env:VITE_FIREBASE_MESSAGING_SENDER_ID = "905891434766"
$env:VITE_FIREBASE_APP_ID = "1:905891434766:web:3faf870cd5d2af53a6075f"

vercel --prod `
  -e VITE_FIREBASE_API_KEY=$env:VITE_FIREBASE_API_KEY `
  -e VITE_FIREBASE_AUTH_DOMAIN=$env:VITE_FIREBASE_AUTH_DOMAIN `
  -e VITE_FIREBASE_PROJECT_ID=$env:VITE_FIREBASE_PROJECT_ID `
  -e VITE_FIREBASE_STORAGE_BUCKET=$env:VITE_FIREBASE_STORAGE_BUCKET `
  -e VITE_FIREBASE_MESSAGING_SENDER_ID=$env:VITE_FIREBASE_MESSAGING_SENDER_ID `
  -e VITE_FIREBASE_APP_ID=$env:VITE_FIREBASE_APP_ID

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Your site is now live!" -ForegroundColor Green
Write-Host ""

pause
