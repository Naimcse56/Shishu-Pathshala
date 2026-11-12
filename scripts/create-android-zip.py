#!/usr/bin/env python3
import os
import zipfile
import sys

def make_zip(source_dir, output_zip_path):
    print(f"Creating ZIP archive at {output_zip_path} from {source_dir}...")
    with zipfile.ZipFile(output_zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        # Include entire android directory
        for root, dirs, files in os.walk(source_dir):
            for file in files:
                file_path = os.path.join(root, file)
                rel_path = os.path.relpath(file_path, os.path.dirname(source_dir))
                zipf.write(file_path, rel_path)
        
        # Include root capacitor config and package.json for convenience
        if os.path.exists("capacitor.config.ts"):
            zipf.write("capacitor.config.ts", "capacitor.config.ts")
        if os.path.exists("package.json"):
            zipf.write("package.json", "package.json")
        if os.path.exists("README_ANDROID.md"):
            zipf.write("README_ANDROID.md", "README_ANDROID.md")

    print(f"ZIP created successfully! Size: {os.path.getsize(output_zip_path) / (1024*1024):.2f} MB")

if __name__ == "__main__":
    os.makedirs("public", exist_ok=True)
    make_zip("android", "public/shishu-pathshala-android-project.zip")
