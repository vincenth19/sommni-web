import { Group, List } from "@mantine/core";
import { GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PageHead from "../components/shared/pageHead";
import TitleSection from "../components/shared/titleSection";

const listItems = [
  "Each mattress manufactured under Domus Concept (Asia) Sdn. Bhd. (“Sommni”) carries a 10 Years Comprehensive Warranty period, under international bedding guidelines, against manufacturing defects.",
  "This comprehensive warranty does not cover any bedding that has been soiled or burned, or has received obvious physical abuse or improper care to the fabric. The manufacturer reserves the right not to handle items for repair if, in our opinion, they are in an unsanitary condition.",
  "This comprehensive warranty is only valid to the original purchaser of any Sommni Mattress. All warranties implied are only valid for the time period owned by the original purchaser of the mattress. All Sommni warranties are non-transferrable. As such, any mattresses sold by unauthorised dealers and third party resellers are not covered under Sommni's 10 year comprehensive warranty.",
  "This comprehensive warranty covers all forms of manufacturing defects that caused the foam or Natural latex to split or crack despite proper care and use.",
  "This comprehensive warranty is valid for 10 years starting from the date of successful delivery.",
  "The cost of transportation for repair is to be borne by the buyer.",
  "The comprehensive warranty also does not apply to bedding that has been worn out due to abnormal use, and wear and tear over the years.",
  "Any manufacturing defects arising within the first year of purchase will be repaired at no cost but cost of transportation shall be borne by the purchaser.",
  "Should any manufacturing defects develop after the first year, any repair will be charged on a prorated basis based on 1/10th of the current retail price multiplied by the number of years used, plus transportation charges.",
  "In line with Sommni's ongoing research and commitment towards excellence, the Company reserves the right to substitute materials of equal quality, should the identical materials are not available at the time of repair or replacement.",
  "Our Company will not be held responsible for repairs done outside of our factory.",
  "Sommni reserves the right to repair or replace either parts of the mattress or base or the entire mattress or base at its option.",
  "There is not a comfort or sleeping satisfaction guarantee, it covers manufacturing faults only. A bed that is not suitable to your comfort (i.e. too soft or too hard) is not a manufacturer's warranty fault.",
  "All mattresses will show body impressions as the upholstery settles. This is not a structural defect covered by this limited warranty. The upholstery is intended to provide cushioning and body impression is unavoidable, body impressions of 1.5 inch or 38 mm is considered as normal.",
  "Our Company will not be held responsible for repairs done outside of our factory.",
];

const Warranty: NextPage = () => {
  return (
    <>
      <PageHead title="Sleep Experience - Sommni" />
      <TitleSection title={"Warranty"} />
      <Group
        direction="column"
        spacing={"xl"}
        style={{ minHeight: "48vh", padding: "4rem 0" }}
      >
        <List>
          <Group direction="column">
            {listItems.map((item, index) => {
              return <List.Item key={index}>{item}</List.Item>;
            })}
          </Group>
        </List>
      </Group>
    </>
  );
};

export default Warranty;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, ["common", "footer"])),
    },
  };
};
