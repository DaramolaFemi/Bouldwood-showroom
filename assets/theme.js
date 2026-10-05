document.documentElement.classList.add('js');

document.querySelectorAll('[data-product-root]').forEach((root) => {
  const optionSelects = [...root.querySelectorAll('[data-option-index]')];
  const variantSelect = root.querySelector('[data-variant-select]');
  if (!variantSelect || optionSelects.length === 0) return;

  const syncVariant = () => {
    const key = optionSelects.map((select) => select.value).join('||');
    const match = [...variantSelect.options].find((option) => option.dataset.options === key);
    if (match && !match.disabled) variantSelect.value = match.value;
  };

  optionSelects.forEach((select) => select.addEventListener('change', syncVariant));
});