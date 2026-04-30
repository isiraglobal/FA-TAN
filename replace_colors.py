import os

target_dir = '/Users/lakshitsinghvi/FA-TAN/src'

def replace_in_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    new_content = content.replace('#82CAFF', '#0690d4').replace('#2D7ED6', '#0690d4')
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, _, files in os.walk(target_dir):
    for file in files:
        if file.endswith('.jsx'):
            replace_in_file(os.path.join(root, file))
