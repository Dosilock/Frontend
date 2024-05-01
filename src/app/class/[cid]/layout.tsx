import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { NavigationTabs } from './_components/NavigationTabs';

export default function Layout({ children, params }: PropsWithChildren<{ params: { cid: string } }>) {
  // const { cid } = params;

  // if (cid !== '12321') {
  //   notFound();
  // }

  return (
    <div>
      <NavigationTabs />

      <main>{children}</main>
    </div>
  );
}
