import React from "react";
import {  Box } from "@material-ui/core";
import Page from "../components/layout/Page";
import BigSection from "../components/BigSection";
import TestimonialSection from "../components/TestimonialSection";
import { testimonials } from "../data/testimonials";

export default function Page2(): JSX.Element {
  return (
    <Page maxWidth={false}>
      <BigSection
        title="Mes annonces"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
       <Box sx={{ mb: 8 }}>
        <TestimonialSection testimonials={testimonials} />
      </Box>
    </Page>
  );
}
