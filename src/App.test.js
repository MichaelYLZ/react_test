import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import React from 'react';
import App from './App.js';

describe('test', () => {
    
    let wrapper;
                          
    beforeEach( () => {
        wrapper = shallow( <App /> );
    })
    
    it('01-初次渲染测试th元素是否存在', () => {
        expect(
          wrapper.contains(<th>Items</th>)
        ).toBe(true);
    })
        
    it('02-初次渲染测试input是否存在', () => {
      expect(
      wrapper.containsMatchingElement(<input />)
      ).toBe(true)  
    })
        
    it('03-初次渲染测试button元素是否存在', () => {
        const btn = wrapper.find('button').first();
        
        expect(
        btn.prop('disabled')
        ).toBe(true);
    })
        
    describe('用户开始输入妈妈', () => {
        
        beforeEach(() => {
            const input = wrapper.find('input').first();
            input.simulate(
            'change', {target: {value: '妈妈'}}
            )
        })
        
        it('输入后组件state状况-01', () => {
            expect(
            wrapper.state('item')
            ).toBe('妈妈')
        })
        
        it('输入后组件button状况-02', () => {
            const btn = wrapper.find('button');
            
            expect(
            btn.prop('disabled')
            ).toBe(false);
        })
        
        describe('用户可能--清除输入', () => {
            
            beforeEach( ()=> {
              const input = wrapper.find('input');
              input.simulate(
              'change',{ target: { value: '' } }
              )
            })
            
            it('按键无法启动', () => {
                const btn = wrapper.find('button');
                
                expect(
                btn.prop('disabled')
                ).toBe(true);
            })
            
            it('state变空字符串', () => {
                expect(
                wrapper.state('item')
                ).toBe('')
            })
            
        })
        
        describe('用户可能--提交数据', () => {
            beforeEach( () => {
                const form = wrapper.find('form');
                form.simulate(
                'submit',{preventDefault: ()=>{},}
                );
            })
            
            it('按键无法启动', () => {
                const btn = wrapper.find('button');
                
                expect(btn.prop('disabled')).toBe(true)
            })
            
            it('state有变化', ()=>{  
              expect(
              wrapper.state('items')
              ).toContain('妈妈')
            })
            
            it('可以看到妈妈',() => {
                expect(
                wrapper.contains(<td>妈妈</td>)
                ).toBe(true)
            })
                
            it('输入框内为空字符串', () => {
                const input = wrapper.find('input');
                expect(
                  input.prop('value')
                ).toBe('')
            })
        })
        
    })
        
})