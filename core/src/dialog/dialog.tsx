import * as React from "react";
import { background } from "../background/background";
import { Border, border } from "../border/border";
import { shadow } from "../shadow/shadow";
import { DivPx } from "../div/div";
import s from "./dialog.module.css";
import { DialogMessage } from "./utils/message";

interface ChildrenProps {
	children: React.ReactNode;
}

export interface DialogProps extends ChildrenProps {
	onEsc?: () => void;

	/**
	 * Width of the pane
	 */
	width?: "fixed" | "content";
}

export const DialogPane = (props: DialogProps): JSX.Element => {
	const width = props.width === "fixed" ? s.widthFixed : s.widthAuto;
	const style = DialogPane.styles.outset;
	return (
		<div
			className={[s.dialog, style, width].join(" ")}
			children={props.children}
		/>
	);
};

DialogPane.styles = {
	outset: [
		border.px1,
		border.strong,
		shadow.boxStrong,
		background.strong,
	].join(" "),
};

/**
 *
 * Dialogs present content overlaid over other parts of the UI.
 */
export const Dialog = (props: DialogProps) => (
	<div
		className={[s.container, s.fill].join(" ")}
		onKeyDown={(event) => {
			if (event.key === "Escape") props.onEsc?.();
		}}
	>
		{/* Separate so we can use opacity instead of alpha channel */}
		<div
			className={[background.weak, s.backdrop, s.fill].join(" ")}
			onClick={props.onEsc}
		/>
		<DialogPane {...props} />
	</div>
);

Dialog.defaultProps = {
	width: "fixed",
};

Dialog.Header = (props: ChildrenProps) => (
	<>
		<div className={s.header} children={props.children} />
		<Border color="weak" />
	</>
);

Dialog.Body = (props: ChildrenProps) => (
	<div className={s.body} children={props.children} />
);

Dialog.Footer = (props: ChildrenProps) => (
	<div className={s.footer}>
		<div className={s.footerBody} children={props.children} />
		<DivPx size={24} />
	</div>
);

Dialog.Message = DialogMessage;
