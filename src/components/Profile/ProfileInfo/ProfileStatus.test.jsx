import React from 'react'
import {create} from 'react-test-renderer'
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus",  () => {
    test("1", () => {
        const component = create(<ProfileStatus status = "sjennett" />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("sjennett");
    });
    test("2", () => {
        const component = create(<ProfileStatus status = "sjennett" />);
        const root = component.root;
        let span = root.findByType("span");
        expect(span).not.toBeNull();
    })
    test("3", () => {
        const component = create(<ProfileStatus status = "sjennett" />);
        const root = component.root;
        expect(() => {
            let input = root.findByType("input");
        }).toThrow();
    });
    test("4", () => {
        const component = create(<ProfileStatus status = "sjennett" />);
        const root = component.root;
        let span = root.findByType("span");
        expect(span.children[0]).toBe("sjennett");
    });
    test("5", () => {
        const component = create(<ProfileStatus status = "sjennett" />);
        const root = component.root;
        let span = root.findByType("span");
        span.props.onDoubleClick();
        let input = root.findByType("input");
        expect(input).not.toBeNull();
  //      expect(input.props.value).toBe("sjennett")
    });
    test("6", () => {
        const mockCallBack=jest.fn();
        const component = create(<ProfileStatus status = "sjennett" updateUserStatus={mockCallBack} />);
        const instatance = component.getInstance();
        instatance.deactivateEditMode();
        expect(mockCallBack.mock.calls.length).toBe(1);
    });
});
