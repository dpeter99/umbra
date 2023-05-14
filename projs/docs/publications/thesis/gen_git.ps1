#!/usr/bin/powershell -Command

Write-Host "Writing the git status file for Latex";
Get-Location | Write-Host;
Write-Host "Target file is" $args[0];

Set-Content -Path $args[0] -Value "";

$gitCommit = git rev-parse --short HEAD
Add-Content -Path $args[0] -Value ("\newcommand{\gitcommit}{" + $gitCommit + "}");
Write-Host $gitCommit

$gitBranch = git rev-parse --abbrev-ref HEAD
Add-Content -Path $args[0] -Value ("\newcommand{\gitbranch}{" + $gitBranch + "}");
Write-Host $gitBranch

$gitVersion = git describe "--dirty=-dev" 2>$null
Add-Content -Path $args[0] -Value ("\newcommand{\gitversion}{" + $gitVersion + "}");
Write-Host $gitVersion

Add-Content -Path $args[0] -Value ("\newcommand{\auxdir}{" + $args[1] + "}");
Write-Host "Aux dir" $args[1];
Add-Content -Path $args[0] -Value ("\newcommand{\outdir}{" + $args[2] + "}");
Write-Host "Out dir" $args[2];

exit 0;