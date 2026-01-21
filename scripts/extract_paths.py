import json
import re

def extract_paths():
    with open('amcharts_china.js', 'r', encoding='utf-8') as f:
        content = f.read()

    # The file content is a JS assignment, but the value is JSON-like.
    # We need to extract the "path" array.
    # We can use regex to find the `path` array content.
    
    # Locate the start of "path"
    match = re.search(r'"path":\s*\[', content)
    if not match:
        print("Could not find path array")
        return

    start_index = match.end()
    
    # We need to find the matching closing bracket for the array.
    # Since it is nested, we can count brackets.
    bracket_count = 1
    end_index = start_index
    for i, char in enumerate(content[start_index:]):
        if char == '[':
            bracket_count += 1
        elif char == ']':
            bracket_count -= 1
        
        if bracket_count == 0:
            end_index = start_index + i
            break
            
    json_array_str = content[start_index:end_index]
    
    # Now valid json? Not necessarily, keys might not be quoted if it was raw JS, 
    # but looking at the file, keys are quoted: "id":"CN-34", etc.
    # So it should be valid JSON array content if we wrap it in brackets.
    
    json_str = "[" + json_array_str + "]"
    
    try:
        data = json.loads(json_str)
    except json.JSONDecodeError as e:
        print(f"JSON decode error: {e}")
        # Fallback manual parsing if JSON fails (e.g. trailing commas, though standard JSON doesn't allow them)
        return

    output = "export const CHINA_PATHS: Record<string, { name: string; path: string }> = {\n"
    
    for item in data:
        code = item['id']
        name = item['title']
        path = item['d']
        output += f"  '{code}': {{ name: '{name}', path: '{path}' }},\n"
    
    output += "};\n"
    
    print(output)

if __name__ == '__main__':
    extract_paths()
