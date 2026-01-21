import json
import re

input_file = 'amcharts_china.js'
output_file = 'constants/chinaPaths.ts'

with open(input_file, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Strip comments (// to end of line)
content = re.sub(r'//.*', '', content)

# 2. Extract the object part
# The file defines: AmCharts.maps.chinaLow={"svg":...};
# We want the content after = and before ;
parts = content.split('=', 1)
if len(parts) > 1:
    rhs = parts[1].strip()
    if rhs.endswith(';'):
        rhs = rhs[:-1]
    
    # 3. Fix unquoted keys
    # Pattern: Look for key: value where key is not in quotes.
    # regex: ([{,])\s*([a-zA-Z0-9_]+)\s*:
    fixed_json = re.sub(r'([{,])\s*([a-zA-Z0-9_]+)\s*:', r'\1"\2":', rhs)
    
    try:
        data = json.loads(fixed_json)
        print("JSON parsed successfully")
        
        paths = data.get('svg', {}).get('g', {}).get('path', [])
        
        ts_content = "export const CHINA_PATHS: Record<string, { name: string; path: string }> = {\n"
        
        count = 0
        for item in paths:
            p_id = item.get('id')
            name = item.get('title')
            d = item.get('d')
            
            if p_id and name and d:
                name_safe = name.replace("'", "\\'")
                d_safe = d.replace("'", "\\'")
                
                ts_content += f"  '{p_id}': {{\n"
                ts_content += f"    name: '{name_safe}',\n"
                ts_content += f"    path: '{d_safe}'\n"
                ts_content += f"  }},\n"
                count += 1
                
        ts_content += "};\n"
        
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(ts_content)
            
        print(f"Successfully processed {count} provinces")
        
    except json.JSONDecodeError as e:
        print(f"JSON decode failed: {e}")
        # print(fixed_json[:200])
else:
    print("Could not find assignment in file")
