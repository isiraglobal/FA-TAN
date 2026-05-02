import os
import zipfile
import xml.etree.ElementTree as ET
import pandas as pd

def extract_docx_text(path):
    try:
        with zipfile.ZipFile(path) as z:
            xml_content = z.read('word/document.xml')
            tree = ET.fromstring(xml_content)
            # Find all text elements
            namespace = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            text_elements = tree.findall('.//w:t', namespace)
            return " ".join([t.text for t in text_elements if t.text])
    except Exception as e:
        return f"Error: {e}"

def extract_xlsx_text(path):
    try:
        # Simplest way is using pandas
        df = pd.read_excel(path)
        return df.to_string()
    except Exception as e:
        # Fallback to sharedStrings if pandas fails (it might not be installed)
        try:
            with zipfile.ZipFile(path) as z:
                xml_content = z.read('xl/sharedStrings.xml')
                tree = ET.fromstring(xml_content)
                namespace = {'main': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
                text_elements = tree.findall('.//main:t', namespace)
                return " ".join([t.text for t in text_elements if t.text])
        except:
            return f"Error: {e}"

source_dir = "/Users/lakshitsinghvi/Downloads/Marketpeace"
output_file = "/Users/lakshitsinghvi/FA-TAN/scratch/marketpeace_content.txt"

with open(output_file, "w") as f:
    for filename in os.listdir(source_dir):
        if filename.endswith(".docx"):
            f.write(f"\n--- FILE: {filename} ---\n")
            f.write(extract_docx_text(os.path.join(source_dir, filename)))
            f.write("\n")
        elif filename.endswith(".xlsx"):
            f.write(f"\n--- FILE: {filename} ---\n")
            f.write(extract_xlsx_text(os.path.join(source_dir, filename)))
            f.write("\n")
        elif filename.endswith(".txt") or filename.endswith(".md"):
            f.write(f"\n--- FILE: {filename} ---\n")
            with open(os.path.join(source_dir, filename), "r") as tf:
                f.write(tf.read())
            f.write("\n")

print(f"Extracted content to {output_file}")
