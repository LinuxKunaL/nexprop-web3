import React from "react";

import Avatar from "./components/Avatar";
import WalletInfo from "./components/WalletInfo";
import Escrow from "./components/Escrow";
import Business from "./components/Business";
import Action from "./components/Action";
import ScrollViewProfile from "./components/ScrollViewProfile";
import Header from "./components/Header";

import { ProfileProvider } from "./context";

export default function Profile() {
  return (
    <ProfileProvider>
      <Header />
      <ScrollViewProfile>
        <Avatar />
        <WalletInfo />
        <Escrow />
        <Business />
        <Action />
      </ScrollViewProfile>
    </ProfileProvider>
  );
}
