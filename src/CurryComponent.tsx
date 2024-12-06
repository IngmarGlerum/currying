const CurryComponent = () => {
  const broeken = [
    { name: "broek a", price: 100 },
    { name: "broek b", price: 150 },
    { name: "broek c", price: 200 },
  ];
  const shirts = [
    { name: "shirt a", price: 50 },
    { name: "shirt b", price: 100 },
    { name: "shirt c", price: 150 },
  ];
  const petten = [
    { name: "pet a", price: 35 },
    { name: "pet b", price: 40 },
    { name: "pet c", price: 50 },
  ];

  const calculateTotal =
    (taxRate: number) => (discount: number) => (price: number) => {
      const discountedPrice = price - discount;
      const totalPrice = discountedPrice + discountedPrice * (taxRate / 100);
      return totalPrice;
    };

  const calculateTax21 = calculateTotal(22);
  const calculateTax21andDisc10 = calculateTax21(10);
  const calculateTax21andDisc20 = calculateTax21(20);
  const calculateTax9andDisc30 = calculateTotal(9)(30);

  return (
    <>
      <h1>Currying App</h1>
      <h2>Alle broeken nu 10 euro korting!</h2>
      <ul>
        {broeken.map((broek) => (
          <li key={broek.name}>
            {broek.name}: €{calculateTax21andDisc10(broek.price)}
          </li>
        ))}
      </ul>
      <h2>Alle shirts nu 20 euro korting!</h2>
      <ul>
        {shirts.map((shirt) => (
          <li key={shirt.name}>
            {shirt.name}: €{calculateTax21andDisc20(shirt.price)}
          </li>
        ))}
      </ul>
      <h2>Alle petten nu 30 euro korting en laag btw-tarief! (9% ipv 21%) </h2>
      <ul>
        {petten.map((pet) => (
          <li key={pet.name}>
            {pet.name}: €{calculateTax9andDisc30(pet.price)}
          </li>
        ))}
      </ul>
    </>
  );
};

export default CurryComponent;
