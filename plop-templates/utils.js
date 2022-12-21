import fs from 'fs';
import { resolve } from 'path';

export function notEmpty(name) {
  return name.trim() === '' ? 'name is required' : true;
}

// 函数柯里化
export function dirExsit(param) {
  if (!param) return true;
  const vpath = resolve(process.cwd(), './src/views');
  const contain = fs.readdirSync(vpath).some((v) => v === param);
  return contain ? true : `${param} 路径不存在`;
}
