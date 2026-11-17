#!/usr/bin/env python3
"""Install a checksum-verified Dart Sass release into this checkout's .tools."""
import hashlib
import io
import os
from pathlib import Path
import platform
import tarfile
from urllib.request import urlopen

VERSION = "1.108.2"
CHECKSUMS = {
    "linux-x64": "32d2eb5b83cbc180fce9657ff3c57401a9006c59eccfe0bfdde0aa755a66d42f",
    "linux-arm64": "1c7a587c81467e8f7551d71e5d62845b53270033c5cc3d36aa8fa07330a5d2a9",
    "macos-arm64": "95b1bbb13f0b38ba8aacefae45ef23f11271231d24fb57b1593c9e2adf65481c",
    "macos-x64": "8822d1f3715d84126a6adfe7053559a64e69687bb6e1b5da0d7f854b0c6ba2fa",
}


def main():
    system = {"Linux": "linux", "Darwin": "macos"}.get(platform.system())
    arch = {"x86_64": "x64", "amd64": "x64", "arm64": "arm64", "aarch64": "arm64"}.get(platform.machine().lower())
    target = f"{system}-{arch}"
    if target not in CHECKSUMS:
        raise SystemExit("Install Dart Sass manually: https://gohugo.io/installation/dart-sass/")
    url = f"https://github.com/sass/dart-sass/releases/download/{VERSION}/dart-sass-{VERSION}-{target}.tar.gz"
    with urlopen(url, timeout=60) as response:
        data = response.read()
    if hashlib.sha256(data).hexdigest() != CHECKSUMS[target]:
        raise SystemExit("Dart Sass checksum mismatch; nothing was installed.")
    destination = Path(__file__).resolve().parents[1] / ".tools"
    destination.mkdir(exist_ok=True)
    with tarfile.open(fileobj=io.BytesIO(data)) as archive:
        # Extraction is limited to regular files/directories in dart-sass/.
        for member in archive.getmembers():
            parts = Path(member.name).parts
            if not parts or parts[0] != "dart-sass" or ".." in parts or not (member.isfile() or member.isdir()):
                raise SystemExit("Unexpected Dart Sass archive member.")
        archive.extractall(destination)
    binary_dir = destination / "dart-sass"
    if os.environ.get("GITHUB_PATH"):
        with open(os.environ["GITHUB_PATH"], "a") as path_file:
            path_file.write(str(binary_dir) + "\n")
    print(f"Installed Dart Sass {VERSION}: {binary_dir}")


if __name__ == "__main__":
    main()
