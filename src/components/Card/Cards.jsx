import {Card, CardHeader, CardBody, Image} from '@nextui-org/react';
// eslint-disable-next-line react/prop-types
const Cards = ({title, due, location, img }) => {


  return (
    <Card className="py-4" isPressable onPress={() => {}}>
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-l uppercase font-bold mb-2">{location}</p>
        <small className="text-default-500 mb-6">{due}</small>
        <h4 className="font-bold text-base text-left">{title}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl ml-1 mt-6"
          src={img}
          width={200}
        />
      </CardBody>
    </Card>
  );
}

export default Cards;