
'use client';
import React from 'react';
import { Box, VStack, Text, Card, CardHeader, CardBody } from '@chakra-ui/react';
import { StructuredList, StructuredListHeader, StructuredListItem, StructuredListCell, } from '@saas-ui/react';
import type { Tables } from '@/types_db';
import { User } from '@supabase/supabase-js';
import SaasButton from '../SaasButton';
import StripeWidget from './StripeWidget';

type Subscription = Tables<'subscriptions'>;
type Product = Tables<'products'>;
type Price = Tables<'prices'>;

interface ProductWithPrices extends Product {
  prices: Price[];
}
interface PriceWithProduct extends Price {
  products: Product | null;
}
interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}
interface Props {
  user: User | null | undefined;
  products: ProductWithPrices[];
  subscription: SubscriptionWithProduct | null;
}


export default function Pricing() {

  return (
    <VStack mt="15px">
    <Card
    className="image-card"
    borderColor="onyx"
    borderWidth="0.5px"
  >
        <CardHeader>
           <StripeWidget />
       </CardHeader>
       <CardBody>
        <StructuredList>
          <StructuredListHeader>
          SDXL Model Training and Fine-Tuning
          </StructuredListHeader>
            <StructuredListItem>
              <StructuredListCell>
                  <Text as="p" marginTop="4px">Elevate your visuals to the next level by personalizing your own SDXL image model with high-resolution photos of anyone, anywhere, or anything. Just concentrate on describing what you want, and leave the rest to us – your ideas are now in good hands.</Text>
                  <Box mt="8px">
                    <Text fontSize="xl">
                      Life-time access to the models you train:
                    </Text>
                    <Text color="text-zinc-100">
                      $8.99
                    </Text>
                  </Box>
                  <SaasButton
                    variant="slim"
                    type="button"
                    className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white rounded-md hover:bg-zinc-900"
                  >
                    Learn More
                  </SaasButton>
              </StructuredListCell>
            </StructuredListItem>
        </StructuredList>
        </CardBody>
    </Card>
    </VStack>

  );
}

