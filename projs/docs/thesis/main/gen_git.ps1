#!/bin/bash
#git rev-parse --short HEAD       | awk '{print "\\newcommand{\\gitrevision}{"$1"}"}'     > Version.tex
#git rev-parse --abbrev-ref HEAD  | awk '{print "\\newcommand{\\gitbranch}{"$1"}"}'      >> Version.tex
#git describe --dirty=-dev        | awk '{print "\\newcommand{\\gitversion}{"$1"}"}'     >> Version.tex
Set-Content -Path $args[0] -Value "";

$gitCommit = git rev-parse --short HEAD
Add-Content -Path $args[0] -Value ("\newcommand{\gitcommit}{" + $gitCommit + "}");

$gitBranch = git rev-parse --abbrev-ref HEAD
Add-Content -Path $args[0] -Value ("\newcommand{\gitbranch}{" + $gitBranch + "}");

$gitVersion = &"git" "describe" "--dirty=-dev"
Add-Content -Path $args[0] -Value ("\newcommand{\gitversion}{" + $gitVersion + "}");

Add-Content -Path $args[0] -Value ("\newcommand{\auxdir}{" + $args[1] + "}");
Add-Content -Path $args[0] -Value ("\newcommand{\outdir}{" + $args[2] + "}");