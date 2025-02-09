import { Block, File, Function, Import, Return, Types } from "coli/lib";
import { Identifier } from "coli/lib/ast/identifier";
import { VariableDeclaration } from "coli/lib/declarations/variable";
import { JSXElement } from "coli/lib/jsx";

const AppbarFile = new File({
  name: "Appbar.tsx",
  path: "src/components",
});

// import React, { useEffect, useState } from "react"
const importReact = new Import()
  .importDefault("React")
  .and(
    {
      import: "useEffect",
    },
    {
      import: "useState",
    }
  )
  .from("react");

const Wrapper = new VariableDeclaration("Wrapper");
const TitleAndAvatarWrapper = new VariableDeclaration("TitleAndAvatarWrapper");
const Title = new VariableDeclaration("Title");
const Message = new VariableDeclaration("Message");

/**
 * function Appbar(props: {
 *  title: string,
 *  message: string,
 *  avatar: string
 * }) {
 *  return <Wrapper>
 *      <TitleAndAvatarWrapper>
 *          <Title>{props.title}</Title>
 *          <Avatar src={props.avatar}/>
 *      </TitleAndAvatarWrapper>
 *      <Message>{props.message}</Message>
 *  </Wrapper>
 * }
 */

const AppbarBody = new Block().add(new Return(new JSXElement()));
const Appbar = new Function("Appbar")
  .withParams(
    new Identifier("props", {
      typeAnnotation: Types.struct({
        title: "string",
        message: "string",
        avatar: "string",
      }),
    })
  )
  .withBody(AppbarBody);

const callExpression = Appbar.call();

AppbarFile.import(importReact.make());
AppbarFile.declare(Wrapper, TitleAndAvatarWrapper, Title, Message);

// THE FINAL OUTPUT MUST SEEM LIKE
/**
 * import React, { useEffect, useState } from "react"
 * import styled from "@emotion/styled"
 *
 * function Appbar(props: {
 *  title: string,
 *  message: string,
 *  avatar: string
 * }) {
 *  return <Wrapper>
 *      <TitleAndAvatarWrapper>
 *          <Title>{props.title}</Title>
 *          <Avatar src={props.avatar}/>
 *      </TitleAndAvatarWrapper>
 *      <Message>{props.message}</Message>
 *  </Wrapper>
 * }
 *
 * const Wrapper = styled.div``
 * const TitleAndAvatarWrapper = styled.div``
 * const Title = styled.h1``
 * const Message = styled.span``
 *
 * export default Appbar
 */
