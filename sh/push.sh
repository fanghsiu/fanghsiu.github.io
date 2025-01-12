#!/bin/bash
info="${1:-:pencil: update content}"
git add -A
git commit -m "$info"
git push
