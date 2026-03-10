import React from "react";

import Header from "../components/Header";
import Avatar from "../components/Avatar";
import Escrow from "../components/Escrow";
import Action from "../components/Action";
import { ProfileProvider } from "../context";
import WalletInfo from "../components/WalletInfo";
import Business from "../components/Business";
import ScrollViewProfile from "../components/ScrollViewProfile";

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
