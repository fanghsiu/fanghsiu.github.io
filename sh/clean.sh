#!/bin/bash
[ -e dist/ ] && [ -d dist/ ] && rm -r dist/
[ -e public/atom.xml ] && rm public/atom.xml
[ -e public/feed.xml ] && rm public/feed.xml
[ -e public/feed.json ] && rm public/feed.json
[ -e public/valaxy-fuse-list.json ] && rm public/valaxy-fuse-list.json
