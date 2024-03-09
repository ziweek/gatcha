import { fakerKO as faker } from "@faker-js/faker";
import { FILTER_PRESET } from "@/components/common/data";

export default function getFakeData() {
  const aaa = FILTER_PRESET;
  return {
    userId: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
    contractType: faker.helpers.arrayElement(
      aaa.content["입양 유형"].items as string[]
    ),
    dogType: faker.helpers.arrayElement(aaa.content["견종"].items as string[]),
    contractPrice: faker.number.int({ min: 0, max: 300 }),
    dogSex: faker.person.sex(),
    dogAge: faker.number.int({ min: 0, max: 15 }),
    lat: faker.location.latitude({ min: 35, max: 37.7 }),
    lng: faker.location.longitude({ min: 126.7, max: 129 }),
  };
}
