#!/bin/bash
info="${1:-Update Content}"
git add -A
git commit -m "$info"
git push
