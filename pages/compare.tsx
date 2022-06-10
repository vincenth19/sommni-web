import {
  Group,
  List,
  Table,
  Text,
  Image as MantineImage,
  Select,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import dynamic from "next/dynamic";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { RiCheckLine, RiCloseLine } from "react-icons/ri";
import { screenSizes } from "../types";

const PageHead = dynamic(() => import("../components/shared/pageHead"));
const TitleSection = dynamic(() => import("../components/shared/titleSection"));

type TLatexInfo = {
  img: string;
  title: string;
  desc: string;
};

const latexInfo: TLatexInfo[] = [
  {
    img: "/latex-safe-blue.png",
    title: "Clean & Safe",
    desc: "Pre-washed through a series of water sprays and squeeze rolls. Only the highest quality of Natural Latex products go through this complicated process. Quality and hygiene of Natural Latex is enhanced.Prevents bacterial growth and allergies.",
  },
  {
    img: "/latex-eco-blue.png",
    title: "Environmentally Friendly",
    desc: "Biodegradable. Breathable and resistant to fungus and mildew.",
  },
  {
    img: "/latex-comfort-blue.png",
    title: "Support & Comfort",
    desc: "Provides ideal pressure relief. Corrects postural alignment. High resilience and elasticity. Excellent support and comfort.",
  },
  {
    img: "/latex-sleep-blue.png",
    title: "No Sleep Disturbance",
    desc: "Each surface point reacts to weight and pressure independently. No disturbance during sleep.",
  },
  {
    img: "/latex-pure-blue.png",
    title: "Pure & Simple",
    desc: "Made from 100% high quality Malaysian Natural Latex. Certified by the European ECO standard test. No Chlorofluorocarbon (CFC) used.",
  },
  {
    img: "/latex-heat-blue.png",
    title: "High Heat Dispersion",
    desc: "Special open and interconnected Latex cellstructure. Does not trap heat. High degree of heat is dispersed.",
  },
  {
    img: "/latex-airflow-blue.png",
    title: "Excellent Ventilation",
    desc: "Honeycomb-like ventilation design. Promotes excellent air flow. Reducing motion disturbance.",
  },
  {
    img: "/latex-durable-blue.png",
    title: "Durable and Long Lasting",
    desc: "Long lasting comfort and support for years. Organically flexible and bendable.",
  },
  {
    img: "/latex-craft-blue.png",
    title: "Superior Quality & Craftsmanship",
    desc: "Handmade by a skilled team. Made with passion to impress and satisfy. Fine and detailed workmanship. Stringent quality control.",
  },
];

type TTableMaterialData = {
  key: string;
  title: string;
  img: string;
  cost: string;
  materialDesc: string;
  noDisturbance: boolean;
  noEMF: boolean;
};

const tableMaterialData: TTableMaterialData[] = [
  {
    key: "spring",
    title: "Spring",
    img: "https://k4i9g8t2.rocketcdn.me/wp-content/uploads/2020/05/bonnell-e1590573913358.jpg",
    cost: "$",
    materialDesc: "Iron & Metal",
    noDisturbance: false,
    noEMF: false,
  },
  {
    key: "natural-latex",
    title: "Natural Latex",
    img: "https://media.istockphoto.com/photos/natural-latex-sample-picture-id525271801?k=20&m=525271801&s=612x612&w=0&h=OvZx4V5Az1QSp9zelquk3LsHsKogl7voZGoSssP8k5g=",
    cost: "$$$$$",
    materialDesc: "Natural rubber sap from rubber trees",
    noDisturbance: true,
    noEMF: true,
  },
  {
    key: "synthetic-latex",
    title: "Synthetic Latex",
    img: "https://unamattress.co.uk/wp-content/uploads/2021/06/natural-latex-mattress.png",
    cost: "$$$",
    materialDesc: "Mix of natural rubber and chemical fillers",
    noDisturbance: true,
    noEMF: true,
  },
  {
    key: "foam",
    title: "Foam",
    img: "https://www.bedsos.co.uk/images/4ft-small-double-extreme-50-memory-foam-mattress-p521-36101_image.jpg",
    cost: "$",
    materialDesc: "A range of different chemicals",
    noDisturbance: true,
    noEMF: true,
  },
  {
    key: "memory-foam",
    title: "Memory Foam",
    img: "https://www.thesleepjudge.com/wp-content/uploads/2017/03/viscoelastic-polyurethane-foam.jpg",
    cost: "$$$",
    materialDesc: "A range of different chemicals",
    noDisturbance: true,
    noEMF: true,
  },
  {
    key: "resi-foam",
    title: "High Resilience Foam",
    img: "https://www.slumbersearch.com/img/materials/highr.jpg",
    cost: "$$",
    materialDesc: "A range of different chemicals",
    noDisturbance: true,
    noEMF: true,
  },
];

const Compare: NextPage = () => {
  const biggerScreen = useMediaQuery(`(min-width: ${screenSizes.md})`);

  const [isDesktop, setIsDesktop] = useState<boolean>();

  useEffect(() => {
    setIsDesktop(biggerScreen);
  }, [biggerScreen]);

  return (
    <>
      <PageHead title="Compare - Sommni" />
      <TitleSection title={"Compare"} />
      <Group
        direction="column"
        position="center"
        style={{ paddingBottom: "4rem" }}
      >
        <h2>Benefits of Natural Latex</h2>
        <List>
          <List.Item>
            One of the finest natural products in the world. Precious gift from
            out mother nature.
          </List.Item>
          <List.Item>
            Providing the perfect balance of comfort and support. No other
            material can match natural latex in giving your body the ideal
            pressure relief and conforms naturally to our body contour.
          </List.Item>
          <List.Item>Naturally anti-bacterial and non-allergenic.</List.Item>
          <List.Item>
            Perfectly clean and hygienic. All of our products will be pre-washed
            by washing of certain residual substances improves the quality and
            hygiene of the product.
          </List.Item>
          <List.Item>
            Bodily heat is easily dispersed while sleeping on natural latex
            mattress. This is because the structure of the latex cells is open
            and interconnected, unlike the conentional foam propoerties.
          </List.Item>
          <List.Item>
            No sleep disturbance, minimal partner disturbance, enjoy a restful
            slumber every night. As each point of the latex surface reacts to
            weight and pressure independently.
          </List.Item>
          <List.Item>Environmentally friendly and biodegradable.</List.Item>
        </List>
      </Group>
      <Group
        position="center"
        direction="column"
        style={{ paddingBottom: "4rem" }}
      >
        <h2>Characteristics of Natural Latex</h2>
        <Group align="baseline">
          {latexInfo.map((info) => {
            return (
              <Group
                key={info.img}
                direction="column"
                position="center"
                style={{ width: isDesktop ? "32%" : "100%", padding: "1rem 0" }}
              >
                <Image width={100} height={100} src={info.img} />
                <h3>{info.title}</h3>
                <Text align="center" color="gray">
                  {info.desc}
                </Text>
              </Group>
            );
          })}
        </Group>
      </Group>
      <div style={{ paddingBottom: "4rem" }}>
        <TableMaterial isDesktop={isDesktop} />
      </div>
    </>
  );
};

interface TableMaterialProps {
  isDesktop: boolean | undefined;
}

type TSelect = {
  value: string;
  label: string;
};

const TableMaterial: FC<TableMaterialProps> = ({ isDesktop }) => {
  let dropdownData: TSelect[] = [];

  const rows = tableMaterialData.map((data) => {
    dropdownData.push({ value: data.key, label: data.title });
    if (isDesktop) {
      return (
        <tr key={data.key}>
          <td>{data.title}</td>
          <td>
            <MantineImage width={150} height={100} src={data.img} />
          </td>
          <td>
            <Text color="teal" size="lg">
              {data.cost}
            </Text>
          </td>
          <td>{data.materialDesc}</td>
          <td>
            <Text size="xl" color={data.noDisturbance ? "teal" : "red"}>
              {data.noDisturbance ? <RiCheckLine /> : <RiCloseLine />}
            </Text>
          </td>
          <td>
            <Text size="xl" color={data.noEMF ? "teal" : "red"}>
              {data.noEMF ? <RiCheckLine /> : <RiCloseLine />}
            </Text>
          </td>
        </tr>
      );
    } else {
      return (
        <tbody key={data.key}>
          <tr>
            <td style={{ width: "100vw" }}>
              <MantineImage
                width={140}
                height={100}
                src={data.img}
                style={{ display: "flex", justifyContent: "center" }}
              />
            </td>
          </tr>
          <tr>
            <td style={{ width: "100vw" }}>
              <Text align="center" weight={700} color="teal" size="lg">
                {data.cost}
              </Text>
            </td>
          </tr>
          <tr>
            <td style={{ width: "100vw" }}>
              <Text align="center">{data.materialDesc}</Text>
            </td>
          </tr>
          <tr>
            <td style={{ width: "100vw" }}>
              <Text
                align="center"
                size="xl"
                color={data.noDisturbance ? "teal" : "red"}
              >
                {data.noDisturbance ? <RiCheckLine /> : <RiCloseLine />}
              </Text>
              <Text align="center">No Partner Disturbance</Text>
            </td>
          </tr>
          <tr>
            <td style={{ width: "100vw" }}>
              <Text
                align="center"
                size="xl"
                color={data.noEMF ? "teal" : "red"}
              >
                {data.noEMF ? <RiCheckLine /> : <RiCloseLine />}
              </Text>
              <Text align="center">EMF Free</Text>
            </td>
          </tr>
        </tbody>
      );
    }
  });

  const [dropwdown1, setDropdown1] = useState<string>("spring");
  const [dropwdown2, setDropdown2] = useState<string>("natural-latex");

  if (isDesktop) {
    return (
      <Table>
        <thead>
          <tr>
            <th>Material</th>
            <th>Photo</th>
            <th>Cost</th>
            <th>What Is It Made Of?</th>
            <th>No Partner Disturbance</th>
            <th>EMF Free</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    );
  } else {
    return (
      <>
        <Group
          position="center"
          style={{ alignItems: "baseline", padding: "2rem 0" }}
        >
          <Table style={{ width: "46%" }}>
            <thead>
              <tr>
                <Select
                  placeholder="Select a Material"
                  data={dropdownData}
                  onChange={(val) => setDropdown1(val!)}
                  defaultValue={"spring"}
                />
              </tr>
            </thead>
            {rows.filter((row) => row.key === dropwdown1)}
          </Table>
          <Table style={{ width: "46%" }}>
            <thead>
              <tr>
                <Select
                  placeholder="Select a Material"
                  data={dropdownData}
                  onChange={(val) => setDropdown2(val!)}
                  defaultValue={"natural-latex"}
                />
              </tr>
            </thead>
            {rows.filter((row) => row.key === dropwdown2)}
          </Table>
        </Group>
      </>
    );
  }
};

export default Compare;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common", "footer"])),
    },
  };
};
