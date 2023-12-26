---
layout: post
title: JetBrains Patch
date: 2023-11-16
updated: 2023-11-17
categories: [Jetbrains]
tags: [Jetbrains]
---

自己生成根证书签名,并生成注册码配合 ja-netfilter 注册 Jetbrains 全家桶.

<!-- more -->
ja-netfilter https://gitee.com/ja-netfilter/ja-netfilter

## ja-netfilter 配置

自定义 IDE 虚拟机选项, 以 pycharm 为例, 文件路径为 C:\Users\username\AppData\Roaming\JetBrains\PyCharm2023.2\pycharm64.exe.vmoptions

将路径替换为你自己的路径 D:\\Documents\\ja-netfilter\\ja-netfilter.jar .不要有中文和空格,不要使用单反斜杠 \ .

```
-javaagent:D:\\Documents\\ja-netfilter\\ja-netfilter.jar
--add-opens=java.base/jdk.internal.org.objectweb.asm=ALL-UNNAMED
--add-opens=java.base/jdk.internal.org.objectweb.asm.tree=ALL-UNNAMED
```

修改 ja-netfilter 中 conf 文件下文件设置.

```
# dns.conf
[DNS]
EQUAL,jetbrains.com
```

```
# url.conf
[URL]
PREFIX,https://account.jetbrains.com/lservice/rpc/validateKey.action
```

```
# power.conf
[Result]

```

配置 power.conf 时, 用激活码生成代码的第一个输出值添加到新一行就好.

`pycryptodome` `cryptography`

:::details 证书生成代码
```python
import datetime

from cryptography import x509
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.x509.oid import NameOID

one_day = datetime.timedelta(days=1)
ten_day = datetime.timedelta(days=3650)
today = datetime.datetime.today()
yesterday = today - one_day
tomorrow = today + ten_day

private_key = rsa.generate_private_key(
    public_exponent=65537,
    key_size=4096,
    backend=default_backend()
)
public_key = private_key.public_key()
builder = x509.CertificateBuilder()

builder = builder.subject_name(x509.Name([
    x509.NameAttribute(NameOID.COMMON_NAME, 'LTY-from-2012-07-12'),
]))
builder = builder.issuer_name(x509.Name([
    # x509.NameAttribute(NameOID.COMMON_NAME, 'LTY CA'),
    x509.NameAttribute(NameOID.COMMON_NAME, 'JetProfile CA'),
]))
builder = builder.not_valid_before(yesterday)
builder = builder.not_valid_after(tomorrow)
builder = builder.serial_number(x509.random_serial_number())
builder = builder.public_key(public_key)

certificate = builder.sign(
    private_key=private_key, algorithm=hashes.SHA256(),
    backend=default_backend()
)
private_bytes = private_key.private_bytes(
    encoding=serialization.Encoding.PEM,
    format=serialization.PrivateFormat.TraditionalOpenSSL,
    encryption_algorithm=serialization.NoEncryption())
public_bytes = certificate.public_bytes(
    encoding=serialization.Encoding.PEM)
with open("ca.key", "wb") as fout:
    fout.write(private_bytes)
with open("ca.crt", "wb") as fout:
    fout.write(public_bytes)
```
:::

注意将下面代码中 certBase64 的值更改为生成的 ca.crt 的值. 输出值分别为 power.conf配置, 激活码.

:::details 激活码生成代码
```python
import base64

from Crypto.Hash import SHA1, SHA256
from Crypto.PublicKey import RSA
from Crypto.Signature import pkcs1_15
from Crypto.Util.asn1 import DerSequence, DerObjectId, DerNull, DerOctetString
from Crypto.Util.number import ceil_div
from cryptography import x509
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding


def pkcs15_encode(msg_hash, emLen, with_hash_parameters=True):
    """
    Implement the ``EMSA-PKCS1-V1_5-ENCODE`` function, as defined
    :param msg_hash: hash object
    :param emLen: int
    :param with_hash_parameters: bool
    :return: An ``emLen`` byte long string that encodes the hash.
    """
    digestAlgo = DerSequence([DerObjectId(msg_hash.oid).encode()])

    if with_hash_parameters:
        digestAlgo.append(DerNull().encode())

    digest = DerOctetString(msg_hash.digest())
    digestInfo = DerSequence([
        digestAlgo.encode(),
        digest.encode()
    ]).encode()

    # We need at least 11 bytes for the remaining data: 3 fixed bytes and
    # at least 8 bytes of padding).
    if emLen < len(digestInfo) + 11:
        raise TypeError("Selected hash algorithm has a too long digest (%d bytes)." % len(digest))
    PS = b'\xFF' * (emLen - len(digestInfo) - 3)
    return b'\x00\x01' + PS + b'\x00' + digestInfo


certBase64 = "MIIEwjCCAqqgAwIBAgIULMRjp+49PZeYDgbamePLy+8yOO8wDQYJKoZIhvcNAQELBQAwGDEWMBQGA1UEAwwNSmV0UHJvZmlsZSBDQTAeFw0yMzExMTUxNjEyNDFaFw0zMzExMTMxNjEyNDFaMB4xHDAaBgNVBAMME0xUWS1mcm9tLTIwMTItMDctMTIwggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoICAQDCdAmw7iklEfkc16B6+cwG8xtvRPbeySRbTdBNmCFcOhhbJfRsLrQQfD5y1TkB1kW13J5wIIMGYYrUOFf5dZOQbAPaE/n6RKWZg4EsmQmWJSil1uyctsOfPZ7zCMSUFZAECbp7fzWcLS0ddGomamkeoij0GS9+melBwu0CkKGIJfWFwvcV6Bq/jeoowjhC/VvQQi0GpwQPVu3c2VwRrrmeL90SmNKU4DqcMcl9z48k8tPp5bdecmZybh3AnyoRDp5DQDm43PXZIMGB2oiTQIg7/DNtX2YTF5PcRBzFkF28fR8vkFjW+1V6Lo3aplMRR56newgD25Cvf8xGoyh9LQMnqKQ3rUb5uw/MfjDVg3vAcS/OXxzIPKHX/hgqIzh1PR6eLneMKKhl7nds5pHryyqLKmd2kACXi7e138Uo5TubUjgQDthJuIvNuhVPf1bapR+CM/yGySWQxU9+6rfw1fj1btXZcqONAzawhDsHPMhHxaqXquMVmUNIzWSNBYfulQMJj1yI175zOa448wtlkRNBHxa23GDRekxKlm88gZ++3ZK4s/rP3T+ovpEy6Z4UsVzkTLwjinucRqqDcisZvGkKCSZQ2FHz4QgB5JuHO9smI/kDaXt2KiwXDntCmBsHZf54c/z5WdG29hd7LJ3mAm0Suzp5T0gZAxB8qH16c1LevwIDAQABMA0GCSqGSIb3DQEBCwUAA4ICAQCIi/cZhhGqsn69/yFrKzvHd/yj8n+L04eDNOfQeOGMNeXOnzoU831ocplq4xoreTjyN++wRoRbkEBVC2esHbP+HkdJVmflWbwEj/aOr6CSLLG9qmi4THrhZ3YKgvpQHq8bUN0T3orkOu/nZO7C/pOgduJ9MA0XK3g1ExIwqtChDhtQwo+Pm7VD5LIy0bCAzeuJSFWv7a48WW1hl1wxSMlLZDQXik4qr8N3P2QJC4gChHiiIVHtD0KhJEsilhojWtV0g0ZwM9XCxeiPjX+zMEqLFJOMC9aml7QsAKe9KVrvckeY2adMI/z0ZXo+07V+yMNmTfaecI48d7BkCAtf8zLuRH/H/nF1LARGWutk/CR6KVzrbvTpE8HgYilb/vuE21G2wj9LOG4H9Y4QIN26HaUbxk6n0p9oAG4PxX0iQtauzPV9EOEqhBS9arcm76DRqJ6uxHRbuP5dZfavFuO/M1RNZFagkosZyBwkNMU5mxtCce0UerMH3EkTAiTWcig0iFLYZhKjM/26sjMxtPUld+lX5jWuMw85lWIGPzTEXNbzVrBktCrOxiNky5wGdXj6gSI704NLJsssDW9srW7cbFEBATkFVOCLp+aqvYedKAmRsjC1c1Eq1gpHkNelWGMRTQuHQcbzKRPq87afaZJ1GKswV5+l6hjJdEPY4IS9+lEEKg=="

cert = x509.load_der_x509_certificate(base64.b64decode(certBase64))
public_key = cert.public_key()
sign = int.from_bytes(cert.signature, byteorder="big", )
# print(f"sign:\n{sign}\n")

modBits = public_key.key_size
digest_cert = SHA256.new(cert.tbs_certificate_bytes)
r = int.from_bytes(pkcs15_encode(digest_cert, ceil_div(modBits, 8)), byteorder='big', signed=False)
# print(f"result:\n{r}\n")

print(f"EQUAL,{sign},65537,860106576952879101192782278876319243486072481962999610484027161162448933268423045647258145695082284265933019120714643752088997312766689988016808929265129401027490891810902278465065056686129972085119605237470899952751915070244375173428976413406363879128531449407795115913715863867259163957682164040613505040314747660800424242248055421184038777878268502955477482203711835548014501087778959157112423823275878824729132393281517778742463067583320091009916141454657614089600126948087954465055321987012989937065785013284988096504657892738536613208311013047138019418152103262155848541574327484510025594166239784429845180875774012229784878903603491426732347994359380330103328705981064044872334790365894924494923595382470094461546336020961505275530597716457288511366082299255537762891238136381924520749228412559219346777184174219999640906007205260040707839706131662149325151230558316068068139406816080119906833578907759960298749494098180107991752250725928647349597506532778539709852254478061194098069801549845163358315116260915270480057699929968468068015735162890213859113563672040630687357054902747438421559817252127187138838514773245413540030800888215961904267348727206110582505606182944023582459006406137831940959195566364811905585377246353->{r}")

licenseId = '8Z6IT0PIZH'
licensePart = '{"licenseId":"8Z6IT0PIZH","licenseeName":"Vsinger","assigneeName":"洛天依","assigneeEmail":"","licenseRestriction":"","checkConcurrentUse":false,"products":[{"code":"DPN","fallbackDate":"2099-12-31","paidUpTo":"2099-12-31","extended":false},{"code":"DB","fallbackDate":"2099-12-31","paidUpTo":"2099-12-31","extended":false},{"code":"PS","fallbackDate":"2099-12-31","paidUpTo":"2099-12-31","extended":false},{"code":"II","fallbackDate":"2099-12-31","paidUpTo":"2099-12-31","extended":false},{"code":"RSC","fallbackDate":"2099-12-31","paidUpTo":"2099-12-31","extended":true},{"code":"GO","fallbackDate":"2099-12-31","paidUpTo":"2099-12-31","extended":false},{"code":"DM","fallbackDate":"2099-12-31","paidUpTo":"2099-12-31","extended":false},{"code":"RSF","fallbackDate":"2099-12-31","paidUpTo":"2099-12-31","extended":true},{"code":"DS","fallbackDate":"2099-12-31","paidUpTo":"2099-12-31","extended":false},{"code":"PC","fallbackDate":"2099-12-31","paidUpTo":"2099-12-31","extended":false},{"code":"RC","fallbackDate":"2099-12-31","paidUpTo":"2099-12-31","extended":false},{"code":"CL","fallbackDate":"2099-12-31","paidUpTo":"2099-12-31","extended":false},{"code":"WS","fallbackDate":"2099-12-31","paidUpTo":"2099-12-31","extended":false},{"code":"RD","fallbackDate":"2099-12-31","paidUpTo":"2099-12-31","extended":false},{"code":"RS0","fallbackDate":"2099-12-31","paidUpTo":"2099-12-31","extended":false},{"code":"RM","fallbackDate":"2099-12-31","paidUpTo":"2099-12-31","extended":false},{"code":"RSV","fallbackDate":"2099-12-31","paidUpTo":"2099-12-31","extended":true},{"code":"DC","fallbackDate":"2099-12-31","paidUpTo":"2099-12-31","extended":false},{"code":"RSU","fallbackDate":"2099-12-31","paidUpTo":"2099-12-31","extended":false},{"code":"DP","fallbackDate":"2099-12-31","paidUpTo":"2099-12-31","extended":true},{"code":"PDB","fallbackDate":"2099-12-31","paidUpTo":"2099-12-31","extended":true},{"code":"PSI","fallbackDate":"2099-12-31","paidUpTo":"2099-12-31","extended":true},{"code":"PCWMP","fallbackDate":"2099-12-31","paidUpTo":"2099-12-31","extended":true},{"code":"RS","fallbackDate":"2099-12-31","paidUpTo":"2099-12-31","extended":true}],"metadata":"0120230524LPAA004008","hash":"45804326/21935219:-981282252","gracePeriodDays":7,"autoProlongated":false,"isAutoProlongated":false}'


digest = SHA1.new(licensePart.encode('utf-8'))

with open('ca.key') as prifile:
    private_key = RSA.import_key(prifile.read())
    # 使用私钥对HASH值进行签名
    signature = pkcs1_15.new(private_key).sign(digest)

    sig_results = base64.b64encode(signature)
    licensePartBase64 = base64.b64encode(bytes(licensePart.encode('utf-8')))
    public_key.verify(
        base64.b64decode(sig_results),
        base64.b64decode(licensePartBase64),
        padding=padding.PKCS1v15(),
        algorithm=hashes.SHA1(),
    )
    result = licenseId + "-" + licensePartBase64.decode('utf-8') + "-" + sig_results.decode('utf-8') + "-" + certBase64
    print(result)
```
:::

>**参考:**
>
>https://www.xuzhengtong.com/2022/07/25/ja-netfilter/ja-netfilter-plugins-power/
>
>https://bbs.kanxue.com/thread-271052.html
>
>https://bbs.kanxue.com/thread-271578.html
