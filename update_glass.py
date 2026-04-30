import os

target_dir = '/Users/lakshitsinghvi/FA-TAN/src'

def replace_in_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Update glass styles
    new_content = content.replace('bg-white/5', 'bg-[#061530]/40')
    new_content = new_content.replace('bg-white/10', 'bg-[#061530]/60')
    new_content = new_content.replace('bg-white/20', 'bg-[#061530]/70')
    new_content = new_content.replace('backdrop-blur-sm', 'backdrop-blur-xl')
    new_content = new_content.replace('backdrop-blur-md', 'backdrop-blur-2xl')
    new_content = new_content.replace('backdrop-blur-2xl', 'backdrop-blur-3xl')
    
    # Remove emojis
    new_content = new_content.replace('✨', '')
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, _, files in os.walk(target_dir):
    for file in files:
        if file.endswith('.jsx'):
            replace_in_file(os.path.join(root, file))
