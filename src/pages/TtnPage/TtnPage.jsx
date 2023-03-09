import Section from "../../components/Section/Section";
import Container from "../../components/Container";
import SearchForm from "../../components/SearchForm";
import DeliveryStatus from "../../components/DeliveryStatus";
import SearchHistory from "../../components/SearchHistory";

export default function TtnPage() {

    return (
        <Section>
            <Container>
                <SearchForm />
                <DeliveryStatus />
                <SearchHistory />
            </Container>
        </Section>
  );
};