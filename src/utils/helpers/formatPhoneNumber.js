export default function formatPhoneNumber(input) {
  let value = input;

  value = value.replace(/[^\d+]/g, '');

  if (value.indexOf('+') > 0) {
    value = value.replace(/\+/g, '');
  }

  if (!value.startsWith('+998')) {
    if (value.startsWith('+')) {
      value = '+998' + value.slice(1);
    } else {
      value = '+998' + value;
    }
  }

  value = value.replace(
    /^(\+998)(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2}).*/,
    function (_, p1, p2, p3, p4, p5) {
      return [p1, p2, p3, p4, p5].filter(Boolean).join(' ');
    }
  );
  return value;
}

export const deformatPhoneNumber = (input) => input.replace(/\s/g, '');
