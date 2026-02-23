import urllib.request

url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2Q3MGU0ZDQ3MzFlZDQ1ZmZiMTI2ZTdjNzA1MmU4NWFiEgsSBxD8j4GdvwsYAZIBIwoKcHJvamVjdF9pZBIVQhMxOTg2OTY5MDQwMzUzNjc2ODI3&filename=&opi=89354086"
response = urllib.request.urlopen(url)
html = response.read().decode('utf-8')

with open("temp_stitch_login.html", "w", encoding="utf-8") as f:
    f.write(html)

print("HTML saved to temp_stitch_login.html")
