@echo off
:: delete build cache
:: dist/
rd /s /q dist\
:: valaxy rss
del public\feed.xml
:: valaxy rss
del public\feed.json
:: valaxy rss
del public\atom.xml
:: valaxy fuse
del public\valaxy-fuse-list.json
