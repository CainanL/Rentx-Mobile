import React from "react";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import {
    Container,
    Header,
    CarImages
} from "./styles";

export function CarDetails() {
    return (
        <Container>
            <Header>
                <BackButton onPress={() => { }} />

            </Header>
            <CarImages>
                <ImageSlider imagesUrl={['https://img1.gratispng.com/20171221/exw/audi-png-picture-5a3be6cf5a1238.6366876115138751513689.jpg']} />
            </CarImages>
        </Container>
    );
};







