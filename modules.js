const findClassName = (object, target) => {
  const reg = new RegExp(target, 'g');
  if(reg.test(object)) return true;
  return false;
}

export {
  findClassName
};