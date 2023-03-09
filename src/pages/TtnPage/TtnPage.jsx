import Section from "../../components/Section/Section";
import Container from "../../components/Container";
import Delivery from "../../components/Delivery";
import SearchHistory from "../../components/SearchHistory";

export default function TtnPage() {

    return (
        <Section>
            <Container>
                <Delivery />
                <SearchHistory />
            </Container>
        </Section>
  );
};