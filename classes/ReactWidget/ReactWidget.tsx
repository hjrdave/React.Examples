/**
 * React Widget class for creating widget instances for for a React App.
 * This can be used to instansiate a React app in html or a CMS like Wordpress
 */
import React from "react";
import { createRoot, Root } from "react-dom/client";

export declare namespace IReactWidget {
  type Props = any;
  interface Init<P = { [key: string]: any }> {
    component: (props: P) => JSX.Element;
    props?: P;
    selector: string;
  }
}
export default class ReactWidget<P> {
  //private properties
  private Component: (props: React.ComponentProps<any>) => JSX.Element;
  private selector: string;
  private props: React.ComponentProps<any>;
  private target: Element | null;
  private root: Root | null;

  //renders component
  private render(): JSX.Element | void {
    if (this.root !== null) {
      const Component = this.Component;
      return this.root.render(<Component {...this.props} />);
    }
    console.warn("ReactWidget: Target Selector does not exist.");
  }

  //unmounts component
  public unMount(): void {
    this.root?.unmount();
  }

  //sets component props
  public setProps(props: React.ComponentProps<any>): void {
    this.props = { ...this.props, ...props };
    this.render();
  }

  //sets resets widget to default
  public reset(): void {
    this.props = {};
    this.render();
  }

  //instanciates widget
  public constructor({ component, selector, props }: IReactWidget.Init) {
    this.Component = component;
    this.selector = selector;
    this.props = props;
    this.target = document.querySelector(this.selector);
    this.root =
      this.target !== null && this.target !== undefined
        ? createRoot(this.target)
        : null;
    this.render();
  }
}
